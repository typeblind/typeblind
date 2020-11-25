package utils

import (
	"math/rand"
	"time"
	"github.com/google/go-github/github"
	log "github.com/sirupsen/logrus"
)

func ShuffleStrings (vals []string) {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	for len(vals) > 0 {
		n := len(vals)
		randIndex := r.Intn(n)
		vals[n-1], vals[randIndex] = vals[randIndex], vals[n-1]
		vals = vals[:n-1]
	}
}

func ShuffleRepos (vals []github.RepositoryContent) {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	for len(vals) > 0 {
		n := len(vals)
		randIndex := r.Intn(n)
		vals[n-1], vals[randIndex] = vals[randIndex], vals[n-1]
		vals = vals[:n-1]
	}
}

func ShuffleAny (vals []struct{}) {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	for len(vals) > 0 {
		n := len(vals)
		randIndex := r.Intn(n)
		vals[n-1], vals[randIndex] = vals[randIndex], vals[n-1]
		vals = vals[:n-1]
	}
}

func Shuffle(length int) []int {
	arr := []int{}

	for i := 0; i < length; i++ {
		arr = append(arr, i)
	}

	// log.Info("check rand arr" + arr)
	log.WithFields(log.Fields{
		"arr": arr,
	}).Info("Check rand arr")

	for i := range arr {
		randIndex := rand.Int63n(int64(len(arr)))

		tmp := arr[i]
		arr[i] = arr[randIndex]
		arr[randIndex] = tmp
	}

	log.WithFields(log.Fields{
		"arr": arr,
	}).Info("Check rand arr")


	return arr
}
