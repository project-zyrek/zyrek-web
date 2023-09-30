import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useOutsideClick } from './use-outside-click'; 

describe('useOutsideClick', () => {
  it('should call onOutsideClick when clicking outside the ref element', () => {
    const onOutsideClickMock = jest.fn();

    function TestComponent() {
      const ref = useRef(null);
      useOutsideClick([ref], onOutsideClickMock);

      return (
        <div>
          <div ref={ref} data-testid="inside-element">
            Inside Element
          </div>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    const insideElement = getByTestId('inside-element');

    // Simulate a click inside the element
    fireEvent.click(insideElement);

    // The onOutsideClick function should not be called
    expect(onOutsideClickMock).not.toHaveBeenCalled();

    // Simulate a click outside the element
    fireEvent.click(document);

    // The onOutsideClick function should be called once
    expect(onOutsideClickMock).toHaveBeenCalledTimes(1);
  });
});
