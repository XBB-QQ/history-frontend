import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skeleton, { CardSkeleton, GridSkeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders basic skeleton', () => {
    const { container } = render(<Skeleton className="w-10 h-10" />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('renders card skeleton with default count', () => {
    const { container } = render(<CardSkeleton />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders card skeleton with specified count', () => {
    const { container } = render(<CardSkeleton count={5} />);
    const cards = container.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBe(5);
  });

  it('renders grid skeleton', () => {
    const { container } = render(<GridSkeleton count={4} />);
    const cards = container.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBe(4);
  });
});
