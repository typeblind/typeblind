package utils

import (
	"math/rand"
)

// GetRandomElement returns random index from 0 to passed argument
func GetRandomElement (arrayLength int) int {
	getRand := rand.Int63n(int64(arrayLength))
	return int(getRand)
}