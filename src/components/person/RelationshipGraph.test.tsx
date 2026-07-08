/**
 * RelationshipGraph — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RelationshipGraph from './RelationshipGraph';

describe('RelationshipGraph', () => {
  it('渲染不报错', () => {
    const { container } = render(<RelationshipGraph personId={1} personName="测试人物" personUid="test-001" />);
    expect(container.firstChild).toBeTruthy();
  });
});
