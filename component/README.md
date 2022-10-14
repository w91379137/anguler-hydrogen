
# 共用 component

## 使用流程

## 通用規定
>1. 必須要有預設值  
>2. ts css html 只能有一種方法去傳遞 
>3. 須記載為何需要這樣做

***
## ts api 規定
>1. 輸入使用 ViewModel  
    (將輸入控制在一個物件上)   
>2. 輸出使用 ViewModel  
    (彈窗類會有 將輸出控制在一個物件上)  
>3. 須附上一個 viewmodel.demo   
    (假資料在開發使用 以供檢視)
>4. 必須要能接上 viewModel is undefined  
    (因為可能忘記帶入需要符合 Null Object pattern)

TODO:  
>None

***
## html api 規定
>1. 輸入使用 TemplateRef 不要用 ng-content  
    (為了複數個輸入)

TODO:  
>1. 需要設計接口對接資料轉換 ngTemplateOutletContext 如何對接  
>2. 是否有 html import html 的設計(scss 可以 import 別人)

***
## scss api 規定
>1. 輸入使用 css variable 輸入  
    (將輸入控制在一個 class 名稱上)

TODO:  
>None

***
