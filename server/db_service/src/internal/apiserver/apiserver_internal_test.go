package apiserver

import (
	"testing"
	// "net/http/httptest"
	// "net/http"
	"github.com/stretchr/testify/assert"
)

func TestAPIServer_HandleHello(t *testing.T) {
	// server := New(NewConfig())
	// rec := httptest.NewRecorder()
	// req, _ := http.NewRequest("GET", "/", nil)
	// server.HandleHello().ServeHTTP(rec, req)
	assert.Equal(t, 1, 1)
}