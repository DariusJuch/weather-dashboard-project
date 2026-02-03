import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard title', () => {
render(<App />);
const linkElement = screen.getByText(/Weather Forecast/i);
expect(linkElement).toBeInTheDocument();
});
