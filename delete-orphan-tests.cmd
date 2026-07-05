@echo off
REM 删除引用不存在组件的废弃测试文件
REM 在 D:\claudeCode\history-frontend 目录下执行

echo 开始删除废弃测试文件...

del "src\components\comments\CommentSection.test.tsx"
del "src\components\dynasty\DynastyGrid.test.tsx"
del "src\components\background\BackgroundLayer.test.tsx"
del "src\components\background\InkParticles.test.tsx"
del "src\components\background\MountainMist.test.tsx"
del "src\components\export\ExportDropdown.test.tsx"
del "src\components\graph\KnowledgeGraphView.test.tsx"
del "src\components\hero\HeroAnimation.test.tsx"
del "src\components\knowledge\KnowledgeGrid.test.tsx"
del "src\components\knowledge\KnowledgeMasonry.test.tsx"
del "src\components\knowledge\TagCloud.test.tsx"
del "src\components\map\MapSVG.test.tsx"
del "src\components\person\PersonGrid.test.tsx"
del "src\components\person\RelationshipGraph.test.tsx"
del "src\components\profile\DimensionRadar.test.tsx"
del "src\components\scene\SceneSwitcher.test.tsx"
del "src\components\scene\SceneTransition.test.tsx"
del "src\components\simulator\OutcomeTree.test.tsx"
del "src\components\simulator\ResultView.test.tsx"
del "src\components\simulator\ShareCard.test.tsx"
del "src\components\themes\ThemeManager.test.tsx"
del "src\components\share\PosterGenerator.test.tsx"
del "src\components\share\ShareDialog.test.tsx"
del "src\components\timeline\Timeline.test.tsx"
del "src\components\timeline\TimelineEvent.test.tsx"
del "src\components\timeline\TimelineFilters.test.tsx"
del "src\components\time\TimeTravelBar.test.tsx"
del "src\components\time\TimeTravelPanel.test.tsx"
del "src\components\languageSwitcher.test.tsx"

echo.
echo 删除完成！
pause
