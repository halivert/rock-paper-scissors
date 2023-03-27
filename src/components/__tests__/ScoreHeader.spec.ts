import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ScoreHeader from '../ScoreHeader.vue'

describe('ScoreHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(ScoreHeader, { props: { score: 10 } })
    expect(wrapper.text()).toContain('Rock Paper Scissors')
    expect(wrapper.text()).toContain('Score')
    expect(wrapper.text()).toContain('10')
  })
})
