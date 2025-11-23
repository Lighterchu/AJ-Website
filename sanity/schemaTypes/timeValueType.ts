// ./schema/duration/timeValueType.ts

import {defineType} from 'sanity'

export const timeValueType = defineType({
  name: 'timeValue',
  title: 'Time',
  type: 'string',
  options: {
    list: ALLOWED_TIMES(),
  },
})

// A function that generates an array of times from 00:00 to 23:30
export function ALLOWED_TIMES() {
    const times: string[] = [];
  
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour12 = ((h + 11) % 12) + 1;     // converts 0–23 → 1–12
        const minutes = m.toString().padStart(2, "0");
        const ampm = h < 12 ? "AM" : "PM";
  
        times.push(`${hour12}:${minutes} ${ampm}`);
      }
    }
  
    return times;
  }
  