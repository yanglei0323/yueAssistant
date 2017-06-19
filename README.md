# yueAssistant
美图助手，小悦助手
美图助手是一款美业人美图设计工具，
主要服务于发型师、发型教育机构、发廊，
解决美业人摄影技术不专业，朋友圈文字编写水平不高，图片排版不具吸引力，工作忙碌不能精心经营朋友圈 等问题。
## iPhone plus系列机型 无法正常显示模板图片
## 问题原因：初步分析由于hidpi-canvas插件与我写的canvas画布width、height样式冲突（当设备像素比=3时出现此问题，iphone6等设备正常）
## 解决方案：去掉hidpi-canvas插件，暂时将canvas画布width与height均放大两倍，绘制图片时相应的也放大两倍，将canvas的css中的width与height设置为正常想要显示的值；
