package github

import (
)

func GetFile(language string) string {
	repo, err := GetRandomRepository(language)

	return "Hello"
}