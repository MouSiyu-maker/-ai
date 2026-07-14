# GitHub 上传与异地运行说明

## 当前可上传文件夹

请上传这个文件夹的内容：

```text
cultural-seeder-v3-claude-code/
```

不要只上传里面的某几个文件，需要保留完整目录结构，尤其是：

```text
index.html
global.css
app.js
model.js
server.mjs
package.json
assets/
tests/
README.md
CLAUDE.md
```

## 方式一：GitHub 网页上传

适合不想用命令行的情况。

1. 打开 GitHub。
2. 点击右上角 `+`，选择 `New repository`。
3. Repository name 建议填写：

```text
cultural-seeder-v3
```

4. 选择 `Public` 或 `Private`。
5. 不要勾选自动生成 README，因为项目里已经有 `README.md`。
6. 创建仓库后，点击 `uploading an existing file`。
7. 把 `cultural-seeder-v3-claude-code` 文件夹里的所有文件拖进去。
8. 等待上传完成后，填写提交说明：

```text
archive cultural seeder v3 demo
```

9. 点击 `Commit changes`。

## 方式二：命令行上传

适合你已经创建好 GitHub 仓库，并拿到了仓库地址的情况。

进入项目目录：

```bash
cd cultural-seeder-v3-claude-code
```

查看当前文件状态：

```bash
git status
```

添加全部文件：

```bash
git add .
```

提交：

```bash
git commit -m "archive cultural seeder v3 demo"
```

如果还没有绑定远程仓库：

```bash
git remote add origin <你的 GitHub 仓库地址>
```

推送到 GitHub：

```bash
git branch -M main
git push -u origin main
```

## 另一台设备下载运行

在另一台设备上安装 Node.js 18 或更高版本，然后执行：

```bash
git clone <你的 GitHub 仓库地址>
cd cultural-seeder-v3
npm start
```

浏览器打开：

```text
http://127.0.0.1:3000
```

如果 3000 端口被占用，终端会自动输出 3001、3002 等可用地址，以实际输出为准。

运行测试：

```bash
npm test
```

完整检查：

```bash
npm run check
```

## GitHub Pages 部署

如果希望生成一个可访问链接：

1. 进入 GitHub 仓库。
2. 打开 `Settings`。
3. 点击左侧 `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，Folder 选择 `/root`。
6. 保存后等待 GitHub 生成访问链接。

由于这是纯静态项目，GitHub Pages 可以直接部署。

## 上传前检查

上传前建议确认：

- `index.html` 在根目录
- `assets/` 文件夹完整存在
- 不要上传 `node_modules/`
- 不要上传 `.DS_Store`
- 不要改动资源文件夹层级
- 上传后在 GitHub 页面能看到 `README.md`
