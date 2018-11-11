// +build linux

package main

import (


	"github.com/riking/joycon/prog4/jcpc"
	"github.com/riking/joycon/prog4/output"
)

func getOutputFactory() jcpc.OutputFactory {
	return func(t jcpc.JoyConType, playerNum int, remap jcpc.InputRemappingOptions) (jcpc.Output, error) {
		switch t {
		case jcpc.TypeLeft:
			return output.NewUInput(output.MappingL, "MotionLeft", remap)
		case jcpc.TypeRight:
			return output.NewUInput(output.MappingR, "MotionRight", remap)
		case jcpc.TypeBoth:
			return output.NewUInput(output.MappingDual, "MotionBoth", remap)
		}
		panic("bad joycon type")
	}
}
