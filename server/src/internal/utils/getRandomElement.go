package utils

import (
	"math/rand"
	"fmt"
)

// GetRandomElement returns random index from 0 to passed argument
func GetRandomElement (arrayLength int) int {
	getRand := rand.Int63n(int64(arrayLength))
	fmt.Println(getRand)
	return int(getRand)
}