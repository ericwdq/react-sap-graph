import React from 'react';
import { shallow } from 'enzyme';
import { Graph } from '../../../src/features/dkom/Graph';

describe('dkom/Graph', () => {
  it('renders node with correct class name', () => {
    const props = {
      dkom: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Graph {...props} />
    );

    expect(
      renderedComponent.find('.dkom-graph').length
    ).toBe(1);
  });
});
