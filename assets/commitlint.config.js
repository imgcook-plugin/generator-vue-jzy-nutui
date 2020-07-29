module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "update", // 更新某功能
        "feat", // 新功能
        "fix", // 修复bug
        "refactor", // 既不是修复 bug 也不是添加新功能的代码更改
        "docs", // 文档更改
        "chore", // 对构建或者辅助工具的更改
        "style", // 不影响代码含义的更改 (例如空格、格式化、少了分号)
        "revert", // 撤回提交
        "perf", // 提高性能的代码更改
        "test" // 添加或修正测试
      ]
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72]
  }
};
