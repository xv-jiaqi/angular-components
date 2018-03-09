# 安装使用

```bash
npm set registry=http://192.168.10.223:7001/
npm install get-ui-ng --save
```

或者
```bash
yarn config set registry http://192.168.10.223:7001/
yarn add get-ui-ng
```

# 本地build
```bash
npm run build
```

# 运行Demo服务

```bash
npm run demo-app
```

# 运行文档服务
```bash
npm run doc-app
```

# TODO

基础模块拆分

业务组件独立


gantt
dateFormat  YYYY-MM-DD
title 蜂鸟“加密狗”开发&测试计划排期

section  项目前期
需求评审          : done,  p1, 2018-02-26, 3d
技术调研          : done,  p2, after p1, 6d
技术方案评审   : done,  p3, after p2, 1d

section  前端开发
加密狗运行环境配置、调试    : active,p4,2018-03-07, 2d
功能开发: p5, 3d
联调、提测:  p5, 2d

section  后端开发
搭建Java相关环境: active, p6, 2d
开发            : active, p7,  2018-03-07, 2d
联调、提测 :  p8, 2d

section 测试上线
环境部署、冒烟测试: 2018-03-22, 1d
功能测试: 2d
整体回归: 1d
