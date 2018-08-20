class Interpreter {
  constructor() {
    var that = this
    this.variables = []
    this.controlTable = []
    this.controlTable["print"] = function(command) {
      if (command.value.type == "string" || command.value.type == "number") {
        console.log("Print",command.value.value)
      } else {
        console.log("Print",that.solve(command.value))
      }
    }

    this.controlTable["assign"] = function(command) {
      if (command.value.type == "string" || command.value.type == "number") {
        that.variables[command.variable] = command.value.value
      } else {
        that.variables[command.variable] = that.solve(command.value)
      }

      console.log(that.variables)
    }
  }

  run(program) {
    console.log("Program",program)
    var labels = program.labelTable
    var commands = program.commands
    this.variables = []

    for (var commandI = 0; commandI < commands.length; commandI++) {
      var command = commands[commandI]
      if (this.controlTable[command.cmd] != undefined) {
        this.controlTable[command.cmd](command)
      } else {
        console.log("Runtime Error")
      }
    }
  }

  solve(expression) {
    console.log("Sovle", expression)
    var left = expression.left
    var right = expression.right
    if (left.type === "op") {
      left = this.solve(left)
    } else {
      left = left.value
    }

    if (right.type === "op") {
      right = this.solve(right)
    } else {
      right = right.value
    }
    if (isNaN(left) === false && typeof left === "string") {
      if (left.indexOf(".") != -1) {
        left = parseFloat(left)
      } else {
        left = parseInt(left)
      }
    }

    if (isNaN(right) === false && typeof right === "string") {
      if (right.indexOf(".") != -1) {
        right = parseFloat(right)
      } else {
        right = parseInt(right)
      }
    }
    var result = ""
    switch (expression.operator) {
      case "+":
        result = left + right
      break

      case "-":
        result = left - right
      break

      case "/":
        result = left / right
      break

      case "*":
        result = left * right
      break
    }
    return result
  }
}