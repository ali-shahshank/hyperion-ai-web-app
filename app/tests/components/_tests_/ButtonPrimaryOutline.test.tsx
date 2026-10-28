import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ButtonPrimaryOutline from '@/components/ButtonPrimaryOutline';

describe('ButtonPrimaryOutline', () => {
  it('renders the provided label', () => {
    render(<ButtonPrimaryOutline label="Submit" />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
