//+build linux,!nobluez,never

package main

import (
	"fmt"
	"github.com/riking/joycon/prog4/bluez"
	"github.com/riking/joycon/prog4/jcpc"
)

func getBluetoothManager() (jcpc.BluetoothManager, error) {
	fmt.Printf("bluez manager created\n")
	return bluez.New()
}
