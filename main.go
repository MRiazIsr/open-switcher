package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

// --- Структуры данных ---

// Входной формат (из seed.json)
type SeedEntry struct {
	SaaSName string   `json:"saas_name"`
	Slug     string   `json:"slug"`
	Repos    []string `json:"repos"` // ["owner/repo", ...]
}

// Ответ от GitHub API (нам нужно только это)
type GitHubRepo struct {
	Name            string `json:"name"`
	FullName        string `json:"full_name"`
	Description     string `json:"description"`
	StargazersCount int    `json:"stargazers_count"`
	HtmlUrl         string `json:"html_url"`
	PushedAt        string `json:"pushed_at"` // Дата последнего коммита
	License         struct {
		Name string `json:"name"`
	} `json:"license"`
}

// Итоговый формат для Next.js
type PageData struct {
	SaaSName     string       `json:"saas_name"`
	Slug         string       `json:"slug"`
	Alternatives []RepoDetail `json:"alternatives"`
}

type RepoDetail struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Stars       int    `json:"stars"`
	Url         string `json:"url"`
	License     string `json:"license"`
	LastUpdate  string `json:"last_update"`
}

// --- Конфиг ---
const GITHUB_API_URL = "https://api.github.com/repos/"

func main() {
	// 1. Читаем токен из ENV
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		log.Fatal("Пожалуйста, задайте GITHUB_TOKEN в переменных окружения")
	}

	// 2. Читаем seed.json
	file, err := os.ReadFile("seed.json")
	if err != nil {
		log.Fatal("Ошибка чтения seed.json:", err)
	}

	var seeds []SeedEntry
	if err := json.Unmarshal(file, &seeds); err != nil {
		log.Fatal("Ошибка парсинга JSON:", err)
	}

	var resultPages []PageData

	// 3. Главный цикл парсинга
	fmt.Printf("Начинаем парсинг %d категорий...\n", len(seeds))

	client := &http.Client{}

	for _, seed := range seeds {
		fmt.Printf("Processing alternatives for: %s\n", seed.SaaSName)

		var alternatives []RepoDetail

		for _, repoFullName := range seed.Repos {
			repoData, err := fetchRepoInfo(client, token, repoFullName)
			if err != nil {
				log.Printf("  [ERROR] Skipping %s: %v\n", repoFullName, err)
				continue
			}

			// Формируем красивый объект для фронтенда
			detail := RepoDetail{
				Name:        repoData.Name,
				Description: repoData.Description, // В будущем здесь можно подключить ChatGPT для рерайта
				Stars:       repoData.StargazersCount,
				Url:         repoData.HtmlUrl,
				License:     repoData.License.Name,
				LastUpdate:  repoData.PushedAt[:10], // Оставляем только YYYY-MM-DD
			}
			alternatives = append(alternatives, detail)
			fmt.Printf("  + %s (%d stars)\n", repoData.Name, repoData.StargazersCount)

			// Вежливость к API
			time.Sleep(300 * time.Millisecond)
		}

		// Добавляем готовую страницу в результат
		resultPages = append(resultPages, PageData{
			SaaSName:     seed.SaaSName,
			Slug:         seed.Slug,
			Alternatives: alternatives,
		})
	}

	// 4. Сохраняем результат в db.json
	output, _ := json.MarshalIndent(resultPages, "", "  ")
	if err := os.WriteFile("db.json", output, 0644); err != nil {
		log.Fatal(err)
	}

	fmt.Println("\n✅ Готово! Данные сохранены в db.json")
}

// Функция запроса к API
func fetchRepoInfo(client *http.Client, token, repoSlug string) (*GitHubRepo, error) {
	req, _ := http.NewRequest("GET", GITHUB_API_URL+repoSlug, nil)
	req.Header.Set("Authorization", "token "+token)
	req.Header.Set("Accept", "application/vnd.github.v3+json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("GitHub status: %d", resp.StatusCode)
	}

	var repo GitHubRepo
	if err := json.NewDecoder(resp.Body).Decode(&repo); err != nil {
		return nil, err
	}
	return &repo, nil
}
