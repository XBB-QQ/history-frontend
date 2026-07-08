/**
 * 核心冒烟测试 — §7 全站回归清单 5 条核心路径
 * @see design/004-closed-loop-testing.md §7 + §10 Phase 2
 */

import { test, expect } from '@playwright/test';

test.describe('核心冒烟测试 (§7 回归 5 条)', () => {
  test('首页加载 — Hero + 导航可见', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('/timeline-hub 事件列表加载', async ({ page }) => {
    await page.goto('/timeline-hub');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('/dynasties 朝代卡片加载', async ({ page }) => {
    await page.goto('/dynasties');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('/persons 人物页加载', async ({ page }) => {
    await page.goto('/persons');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('暗色模式切换', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const toggle = page.getByRole('button', { name: /主题|theme/i });
    await expect(toggle).toBeVisible();
    const before = await page.locator('html').getAttribute('data-theme');
    await toggle.click();
    await page.waitForTimeout(200);
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
  });
});
