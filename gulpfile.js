// переменная название(лучше по смыслу) = подключение
const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');

const spritesmith = require('gulp.spritesmith');

const tinypng = require('gulp-tinypng');

// переменная.метод('строка', функция () {вывод в консоль("то, что нужно вывести");});
gulp.task('test', function () {
    console.log("Hello, world");
});

// Добавляем автопрефиксер
gulp.task('autoprefixer', function (){
    // от куда
    gulp.src('source/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // куда
        .pipe(gulp.dest('app/css'));
});

gulp.task('sprite', function () {
    // создание файлов
    var spriteData = gulp.src('source/sprite/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      imgPath: '../img/sprite.png'
    }));
        // куда положить обработанные картинки спрайтом
    var imgStream = spriteData.img
    .pipe(gulp.dest('app/img'));
        // обработка файла css автопрефиксами
    var cssStream = spriteData.css
        // куда выгрузить
    .pipe(gulp.dest('app/css'));
});

gulp.task('tinypng', function () {
    gulp.src([
        'source/img/*.png',
        'source/img/*.jpg',
        'source/img/*.jpeg'
    ])
        .pipe(tingpng('API_KEY'))
        .pipe(gulp.dest('app/img'));
});

// автоматизация автопрефиксера
gulp.task('watch', ['autoprefixer', 'sprite'], function () {
    gulp.watch('source/css/*css', ['autoprefixer']);
    gulp.watch('source/sprite/*.png', ['sprite']);
    gulp.watch('source/img/**.*', ['tinypng']);
});

// запуск по слову gulp
gulp.task('default', ['watch']);

