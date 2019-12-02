
# **쿠쿠닥스 옴니뷰어(kukuviewer) 가이드**
**Last Modify : 2019-11-15**
**적용버전 : v1.6.2**

---

## **HTML5 Viewer 파일구성**

+ css
  - **viewer.min.css**
  + fonts
    - kk-icon.eot
    - kk-icon.svg
    - kk-icon.ttf
    - kk-icon.woff
+ external
  + cmaps
  - worker.js
+ js
  - **kukuviewer.bundle.min.js**
+ index.html
  
---



## Getting started

### 1. Include kukuviewer Files To Website/App
website에 kukuviewer 의 css파일과 js파일을 추가합니다. 

``` HTML
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="css/viewer.min.css">
    ...
    <script src="js/kukuviewer.bundle.min.js"></script>
</head>
<body>

</body>
</html>
```

### 2. Add kukuviewer HTML Layout
아래와 같은 뷰어 레이아웃과 로딩HTML 을 추가합니다. 
``` HTML
<div id="html5viewer"></div>
<div class="loading on">
    <div class="square"><div class="spin"></div><br/>Now Loading...</div>
</div>
```


### 3. Initialize kukuviewer

kukuviewer 를 설정합니다. 
``` HTML

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/viewer.min.css" />
    <script type="text/javascript" src="js/kukuviewer.bundle.js"></script>
    <script type="text/javascript" >
    var kukuViewer = new kukuViewer({
        "wrap" : "html5viewer",
        "company" :{
            "display" : true,
            "logo" : "",
            "kakao" : "",
            "copy" : "",
        },

        "toolbar" : {
            "desktop" : [
                "download", "print", "fullscreen"
            ],
            "mobile" : [
                "thumbview", "searchview", "outlineview", "pagejump", "tts", "download", "sketch", "memo", "highlight"
            ]
        },

        "fileinfo" : {
            "filepath" : "documant.pdf",
            "title" : "Documant Title",
            "watermark" : "Watermark Text",
            "muti" : true
        },
        
        "loading" : {
            "downloadURL" : "data/tck_o.pdf",
            "viewmode" : "slide",
            "basePath" : "external"
        }
    });
    </script>
</head>
<body worker="./js/pdfjsWorker.bundle.js">
<div id="html5viewer"></div>
```


---

## Kukuviewer APIs

### kukuviewer Full HTML Layout
``` HTML
<div id="html5viewer"></div>
<div class="loading on">
    <div class="square"><div class="spin"></div><br/>Now Loading...</div>
</div>
```

### Initialize kukuviewer
``` javascript
var kukuViewer = new kukuViewer({
    "wrap" : "html5viewer",
    "fileinfo" : {
        "filepath" : "documant.pdf",
        "title" : "Documant Title",
    },
    "loading" : {
        "basePath" : "external"
    }
});
```

### kukuviewer Setting Parameters

#### kukuviewer 를 불러올 DOM 설정

Parameter | Type    | Default | Description 
---       |---      |---      |---          
`wrap`    | string  | null    | kukuviewer 를 불러올 Element ID 

 
#### `fileinfo` PDF파일 설정

Parameter   | Type    | Default | Description |
---          |---      |---|---|
`doc_id`    | string  | | PDF파일을 구문하는 문서 ID |
`filepath`  | string  | | 불러올 PDF파일의 PATH |
`title`     | string  | | 파일 타이틀 |
`watermark` | string  | | 워터마크 |
`multi`     | boolean | false | 멀티모드 설정 |



#### 멀티모드(`multi` = true) 일때  `file` PDF파일 설정

Parameter   | Type    | Default | Description 
---          |---      |---      |---          
`path`      | string  |         | PDF파일의 PATH 
`title`     | string  |         | 파일 타이틀 


``` javascript 
...
    "fileinfo" : {
        "doc_id" : "",
        "ckey" : "",
        "filepath" : "",
        "muti" : true,
        "file" : [
            {
                "path" : "path/news_1.pdf",
                "title" : "Title 1",
                "page" : 5
            },
            {
                "path" : "path/news_2.pdf",
                "title" : "Title 2",
                "page" : 5
            },
            {
                "path" : "path/news_3.pdf",
                "title" : "Title 3",
                "page" : 5
            },
            {
                "path" : "path/news_4.pdf",
                "title" : "Title 4",
                "page" : 8
            }  
        ],
    },
...

```



#### PDF 뷰어 툴바설정 (`toolbar`)

|Parameter   | Type    | Default | Description |
|---         |---      |---      |---          |
|`desktop`   | Array   |         | `"download", "print", "fullscreen", "ebookview", "slideview"`|
|`mobile`    | Array   |         | `"thumbview", "searchview", "outlineview", "pagejump", "tts", "download", "sketch", "memo", "highlight"`|

``` javascript
    "toolbar" : {
        "desktop" : [
            "download", "print", "fullscreen", "ebookview", "slideview"
        ],
        "mobile" : [
            "thumbview", "searchview", "outlineview", "pagejump", "tts", "download", "sketch", "memo", "highlight"
        ]
    }
```



<br>

#### PDF 뷰어 로딩 설정 (`loading`)

Parameter      | Type    | Default | Description 
---            |---      |---      |---          
`downloadURL`  | string  | null    | 다운로드 기능이 활성화 된 후 다운로드 URL
`viewmode`     | string  | slide   | Desktop 모드일다 문서 뷰일하는 방식 설정 <br> **slide** (슬라이드 방식) <br> **ebook** (이북 방식) <br> **scroll** (스크롤 방식)
`basePath`     | string  | null    | 참조하는 lib 폴더 위치 설절 
`isUseTextDom` | boolean | false   | **true** 로 설정하면 뷰어에서 텍스트를 셀렉트할수 있다.
`autoDownload` | boolean | false   | **true** 로 설정하면 페이지 로딩시 다운로드 유도 팝업이 뜬다. 
`tts`          | string  | null    | 음성읽기 기능 설정 <br> **null** 음성읽기 기능 비활성화  <br> **speechSynthesis** HTML5 speechSynthesis 기능으로 음성읽기 기능 지원 <br> **responsivevoice** responsivevoice로 은성읽기 기능 지원
`passwordNeed` | string  | null    | 암호걸린 PDF 로딩시 비밀번호 입력 창 설정 <br> **null** 기본 비밀번호 입력창 호출 <br> **DOM id** 커스텀 비밀번호 입력페이지 호출 element id
`opendb`       | boolean | false   | **true** 로 설정하면, webDB 기능을 활성화 합니다. <br> 메모 / 북마크 / 드로잉 기능을 활성화 하여면 true로 설장해여 함.
`submenubar`   | boolean | false   | **true** 로 설정하면, 모바일뷰잉 세로모드 일때 상단에 툴바가 생김.
`errorfilepath`| string  | null    | pdf파일의 결로가 잘못 되었거나. 깨진 PDF파일 일 때, 지정된 path 에러PDF을 호출함. 
`pageWrapFit`| string  | screen  | page 를 가운데 정렬하기 위해 스크린 사이즈를 계산하는 방법을 정한다. <br> **window** 윈도우를 기준으로 사이즈를 정합니다. <br> **screen** 하드웨어 스크린을 기준으로 합니다. <br> **dom** div를 기준으로 사이즈를 정합니다. 

``` javascript
...
    "loading" : {
        "passwordNeed" : "tckpassWrap",
        "opendb" : false,
        //"submenubar" : true,
        "errorfilepath" : "data/error.pdf",
        "downloadURL" : "data/tck_o.pdf",
        "viewmode" : "slide",
        "isUseTextDom" : false,
        "autoDownload": false,
        "basePath" : "/external",
        //"tts" : "speechSynthesis",
        "pageWrapFit" : "window"
    },
...
```
<br>


---
## Components


