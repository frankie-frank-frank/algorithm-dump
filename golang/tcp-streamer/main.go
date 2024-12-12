// stream files into your frontend from a golang server

package main

import (
	"bytes"
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"io"
	"log"
	"net"
	"time"
)

type FileServer struct {}

// reads handles multiple readLoops
func (fs* FileServer) start() {
	ln, err := net.Listen("tcp", "localhost:3001")
	if err != nil {
		log.Fatal(err)
	}

	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Fatal(err)
		}

		go fs.readLoop(conn) // async read-and-send in a separate go routine
	}
}

// destination
func (fs* FileServer) readLoop(conn net.Conn) {
	// buf := make([]byte, 2048)
	buf := new(bytes.Buffer)
	for {
		// n, err := conn.Read(buf)
		var size int64
		binary.Read(conn, binary.LittleEndian, &size)
		n, err := io.CopyN(buf, conn, size)
		if err != nil {
			log.Fatal(err)
		}

		// file := buf[:n]
		// fmt.Println(file)
		fmt.Println(buf.Bytes())
		fmt.Printf("Received %d bytes over the network\n", n)
	}
}

// source
func sendFile(size int) error {
	file := make([]byte, size)
	_, err := io.ReadFull(rand.Reader, file)
	if err != nil {
		return err
	}

	fmt.Println("Attempting to dial tcp")
	conn, err := net.Dial("tcp", "localhost:3001")
	if err != nil {
		return err
	}

	binary.Write(conn, binary.LittleEndian,int64(size))
	fmt.Println("Attempting to write to file")
	n, err := io.CopyN(conn, bytes.NewReader(file), int64(size))
	// 	n, err := conn.Write(file)
	if err != nil {
		return err
	}
	fmt.Printf("written %d lines over the network \n", n)
	return nil
}

func main() {
	go func() {
		time.Sleep(4 * time.Second)
		sendFile(2000)
	}()
	server := &FileServer{}
	server.start()
}