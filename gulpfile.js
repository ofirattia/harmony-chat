const gulp = require('gulp');
const template = require('gulp-template');
var header = require('gulp-header');
const footer = require('gulp-footer');
const rename = require("gulp-rename");
const inject = require('gulp-inject-string');
const replace = require('gulp-replace');
const sass    = require('gulp-sass');


const CLIENT_PATH = './client/';
const CLIENT_DIST_PATH = './client/dist';


/** ------------------- CLIENT ----------------------------- **/

const CLIENT_SASS_FILES = 
gulp.task('sass', function () {
  return gulp.src(CLIENT_PATH+'/style/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(CLIENT_DIST_PATH+'/style'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(CLIENT_PATH+'/style/sass/**/*.scss', ['sass']);
});
gulp.task('localeCreator', () => {

	let locale = getArg('locale');

	if (!validateName(locale, '--locale', false)) return;

	createTemplate(
		'./generator/templates/client/locale-template',
		'client/src/base/features/i18n/locale/' + locale + '.js',
		{
			name: locale + 'Locale'
		}
	);

	injectAppend(
		'./client/src/base/features/i18n/index.js',
		'./client/src/base/features/i18n/',
		"import " + locale + "Locale" + " from " + "'./locale/" + locale + "';\n"
	).on('end', () => {
		injectAfter(
			'./client/src/base/features/i18n/index.js',
			'./client/src/base/features/i18n/',
			"en: enLocale,",
			'\n\t' + locale + ': ' + locale + 'Locale,'
		);
	});


});

gulp.task('i18nCreator', () => {

	let name = getArg('name');
	let locale = getArg('locale');

	if (!validateName(locale, '--locale', false) && !validateName(locale, '--locale', false)) return;

	createTemplate(
		'./generator/templates/client/i18n-template',
		'client/src/containers/' + name + '/i18n/' + name + '.i18n.' + locale + '.js',
		{}
	);


	injectAppend(
		'./client/src/base/features/i18n/locale/' + locale + '.js',
		'./client/src/base/features/i18n/locale/',
		'import ' + name + 'Locale' + ' from ' + "'../../../../containers/" + name + "/i18n/" + name + ".i18n." + locale + "';\n"
	).on('end', () => {
		injectAfter(
			'./client/src/base/features/i18n/locale/' + locale + '.js',
			'./client/src/base/features/i18n/locale/',
			"// Gulp Inject Locales Here",
			'\n\t' + '...' + name + 'Locale,'
		);
	});


	gulp.src('./client/src/base/features/i18n/locale/' + locale + '.js')
		.pipe(header('import ' + name + 'Locale' + ' from ' + "'../../../../containers/" + name + "/i18n/" + name + ".i18n." + locale + "';\n"))
		.pipe(gulp.dest('./client/src/base/features/i18n/locale/'));

});


gulp.task('createContainer', () => {
	let name = getArg('name');
	let className = getArg('className');
	let storeName = getArg('storeName');


	if (!validateName(name, '--name', false) && !validateName(storeName, '--storeName', false) && !validateName(className, '--className', true)) return;

	gulp.start('createContainerOnly');
	gulp.start('createSagaFile');
	gulp.start('createRedux');
});

gulp.task('createFormContainer', () => {
	let name = getArg('name');
	let className = getArg('className');
	let storeName = getArg('storeName');

	if (!validateName(name, '--name', false) && !validateName(storeName, '--storeName', false) && !validateName(className, '--className', true)) return;

	gulp.start('createFormContainerOnly');
	gulp.start('createSagaFile');
	gulp.start('createRedux');

});

gulp.task('createContainerOnly', () => {
	let name = getArg('name');
	let className = getArg('className');

	if (!validateName(name, '--name', false) && !validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/container-template',
		'client/src/containers/' + name + '/' + className + '.js',
		{
			name: name,
			className: className
		}
	);

});

gulp.task('createFormContainerOnly', () => {
	let name = getArg('name');
	let className = getArg('className');

	if (!validateName(name, '--name', false) && !validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/form-container-template',
		'client/src/containers/' + name + '/' + className + '.js',
		{
			name: name,
			className: className
		}
	);

});

gulp.task('createComponent', () => {
	let componentName = getArg('name');

	if (!validateName(componentName, '--name', true)) return;

	createTemplate(
		'./generator/templates/client/component-template',
		'client/src/components/' + 'Dmb_' + componentName + '.js',
		{name: componentName}
	);

});

gulp.task('createCoreComponent', () => {
	let componentName = getArg('name');

	if (!validateName(componentName, '--name', true)) return;

	createTemplate(
		'./generator/templates/client/core-component-template',
		'client/src/components/core/' + 'Cor_' + componentName + '/' + 'index.js',
		{}
	);

	addFooter(
		'./client/src/components/core/index.js',
		'./client/src/components/core/',
		"export { default as <%= name %> } from './<%= name %>';\n",
		{name: 'Cor_' + componentName}
	);
});

gulp.task('createSagaFile', () => {
	let sagaName = getArg('name');

	if (!validateName(sagaName, '--name', false)) return;


	createTemplate(
		'./generator/templates/client/saga-template',
		'client/src/sagas/' + sagaName + '/' + 'saga_' + sagaName + '.js',
		{}
	);

});

gulp.task('createRedux', () => {
	let reducerName = getArg('name');
	let storeName = getArg('storeName');
	let className = getArg('className');

	if (!validateName(reducerName, '--name', false) && !validateName(storeName, '--storeName', false)) return;

	createTemplate(
		'./generator/templates/client/redux-template',
		'client/src/redux/' + reducerName + '/index.js',
		{name: className}
	);

	injectAfter(
		'./client/src/redux/index.js',
		'./client/src/redux/',
		'const rootReducer = combineReducers({',
		'\n\t' + storeName + ": require('./" + reducerName  + "').reducer" + ','
	);
});



/** ------------------- SERVER ----------------------------- **/

gulp.task('createApi', () => {
    let apiName = getArg('name');
    if(!validateName(apiName, '--name', false)) return;
    let apiType = getArg('apiType');
    if(!apiType){
        apiType = '';
    }
    var template_postfix_apiType = apiType && apiType == 'sql' ? '-sql' : '';
    
    var UPPERCASE_MODEL_NAME = apiName.toString().toUpperCase();
    var CapitalLetterModelName = capitalize(apiName);
    createTemplate(
        './generator/templates/server/api-controller-template'+template_postfix_apiType,
        'server/src/api/'+apiName+'/'+apiName+'.controller.js',
        {
         name: apiName,
         upperCaseModelName : UPPERCASE_MODEL_NAME,
         capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    createTemplate(
        './generator/templates/server/model-template'+template_postfix_apiType,
        'server/src/api/'+apiName+'/model/'+apiName+'.js',
        {
            capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    createTemplate(
        './generator/templates/server/responses-template',
        'server/src/api/'+apiName+'/responses/index.js',
        {
         capitalLetterModelName: CapitalLetterModelName,
         upperCaseModelName : UPPERCASE_MODEL_NAME
        }
    );
    
    createTemplate(
        './generator/templates/server/index-template',
        'server/src/api/'+apiName+'/index.js',
        {
         name: apiName,
         capitalLetterModelName: CapitalLetterModelName
        }
    );
    
    replaceText(
        './server/src/routes/index.js',
        './server/src/routes/',
        "// LASTLINE",
        "app.use(baseAPI+'/"+apiName+"', require('../api/"+apiName+"'));\r\n// LASTLINE"
    );
    
});


/*** HELPERS ***/

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function replaceText(src, dest, needle, text) {
	gulp.src(src)
		.pipe(replace(needle, text))
		.pipe(gulp.dest(dest));
}

function injectAfter(src, dest, injectAfter, injectValue) {
	return gulp.src(src)
		.pipe(inject.after(injectAfter, injectValue))
		.pipe(gulp.dest(dest));
}

function injectAppend(src, dest, inject) {
	return gulp.src(src)
		.pipe(header(inject))
		.pipe(gulp.dest(dest));
}

function createTemplate(src, dest, templateParams) {
	return gulp.src(src)
		.pipe(rename(dest))
		.pipe(template(templateParams))
		.pipe(gulp.dest("./"));
}

function addFooter(src, dest, footerTemplate, footerParams) {
	return gulp.src(src)
		.pipe(footer(footerTemplate, footerParams))
		.pipe(gulp.dest(dest));
}

function validateName(componentName, expectedParam, checkFirstIsUppercase) {
	if (!componentName) {
		console.error("ERR! You are not select mandatory parameter value " + expectedParam);
		return false;
	}

	if (componentName[0] !== componentName[0].toUpperCase() && checkFirstIsUppercase) {
		console.error("ERR!" + expectedParam + " value must start with uppercase");
		return false;
	}

	return true;
}


function getArg(name) {

	let i = process.argv.indexOf('--' + name);
	if (i > -1) {
		return process.argv[i + 1];
	}

	return null;

}
