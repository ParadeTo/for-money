import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts'
import {SqlBaseLexer} from './parserJs/SqlBaseLexer'
import {SqlBaseParser} from './parserJs/SqlBaseParser'

// Create the lexer and parser
let inputStream = new ANTLRInputStream('SELECT * from tbl when id = 1;')
let lexer = new SqlBaseLexer(inputStream)
let tokenStream = new CommonTokenStream(lexer)
let parser = new SqlBaseParser(tokenStream)

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.statement()
console.log(tree.getChildren())
