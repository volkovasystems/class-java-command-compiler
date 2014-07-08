/*:
	@module-configuration:
		{
			"packageName": "class-java-command-compiler",
			"fileName": "class-java-command-compiler.js",
			"moduleName": "JavaCommandCompiler",
			"className": "JavaCommandCompiler",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/class-java-command-compiler.git",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
		{
			"work.js": "work",
			"fs": "fs",
			"path": "path"
		}
	@end-include
*/
var JavaCommandCompiler = function JavaCommandCompiler( ){
	this.compilerEngine = "javac"
};

JavaCommandCompiler.prototype.compile = function compile( directory, classNamespace, callback ){
	/*:
		@meta-configuration:
			{
				"directory:required": "string",
				"classNamespace:required": "string",
				"callback:required": "Callback"
			}
		@end-meta-configuration
	*/

	if( this.checkIfCompiled( directory, classNamespace ) ){
		callback( );
	}else{
		var commandString = [ this.compilerEngine, "-d", directory, classNamespace + ".java" ].join( " " );
		work( commandString, callback );
	}
};

JavaCommandCompiler.prototype.checkIfCompiled = function checkIfCompiled( directory, classNamespace ){
	/*:
		@meta-configuration:
			{
				"directory:required": "string",
				"classNamespace:required": "string"
			}
		@end-meta-configuration
	*/
	var compiledClassFilePath = [ directory, "/", classNamespace, "/", classNamespace + ".class" ].join( path.sep ).replaceAll( "/", path.sep );
	return fs.existsSync( compiledClassFilePath );
};

var work = require( "./work/work.js" );
var fs = require( "fs" );
var path = require( "path" );

( module || { } ).exports = JavaCommandCompiler;