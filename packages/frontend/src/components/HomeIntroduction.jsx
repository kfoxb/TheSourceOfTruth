import React from 'react';
import View from './View';

const HomeIntroduction = React.forwardRef((props, ref) => (
  <View>
    <div ref={ref}>
      <h2 style={{ marginTop: '25px' }}>Introduction</h2>
    </div>
  </View>
));

export default HomeIntroduction;
