/**
 * MapSVG — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MapSVG from './MapSVG';

describe('MapSVG', () => {
  it('渲染不报错', () => {
    const { container } = render(
      <MapSVG
        highlightedRegionIds={new Set<string>()}
        capitalPos={null}
        capitalName=""
        selectedDynastyName=""
      />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
