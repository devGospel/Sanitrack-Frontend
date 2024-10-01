import React, { useMemo } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const SpeedometerValue = ({ cleanTime }) => {
  console.log("clea",cleanTime)
  return (
    <div style={{ width: 'auto', height: 180 }}>
      <ReactSpeedometer
       width={300}
       needleHeightRatio={0.7}
       value={cleanTime}
       
       segments={4}
       currentValueText="Stage"
       customSegmentLabels={[
         {
           text: 'Clean',
           position: 'INSIDE',
           color: '#555',
         },
         {
           text: 'Pre-op',
           position: 'INSIDE',
           color: '#555',
         },
         {
          text: 'Inspect',
          position: 'INSIDE',
          color: '#555',
        },
         {
           text: 'Release',
           position: 'INSIDE',
           color: '#555',
           fontSize: '19px',
         },
        
         
       ]}
       ringWidth={47}
       needleTransitionDuration={3333}
       needleTransition="easeElastic"
       needleColor={'#144FFF'}
       textColor={'#d8dee9'}
        // width={300}
        // needleHeightRatio={0.7}
        // segments={4}
        // maxSegmentLabels={4}
        // value={cleanTime} // Pass cleanTime directly as the value
        // customSegmentStops={[0, 50,75, 100]}
        // segmentColors={['#ff0505', '#ffff05', '#138808','#3e0e75']}
        // customSegmentLabels={[
        //   {
        //     text: 'Clean',
        //     position: 'INSIDE',
        //     color: '#000'
        //   },
        //   {
        //     text: 'Pre-Op',
        //     position: 'INSIDE',
        //     color: '#000'
        //   },
        //   {
        //     text: 'Release',
        //     position: 'INSIDE',
        //     color: '#000'
        //   },
        //   {
        //     text: 'Inspect',
        //     position: 'INSIDE',
        //     color: '#000'
        //   }
        // ]}
        // ringWidth={47}
        // needleTransitionDuration={3333}
        // needleTransition="easeElastic"
        // needleColor={'#000080'}
        // textColor={'#000'}
        // minValue={0}
        // maxValue={100}
      />
    </div>
  );
};

export default SpeedometerValue;
