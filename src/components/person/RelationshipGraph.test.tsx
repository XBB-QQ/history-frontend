/**
 * RelationshipGraph — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RelationshipGraph from './RelationshipGraph';

describe('RelationshipGraph', () => {
  it('渲染不报错', () => {
    const { container } = render(<RelationshipGraph persons={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
