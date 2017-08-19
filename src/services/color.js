'use strict';

const colors = ["#63a395", "#7cbbd6", "#af76db", "#db76cc"];

class Color {
    static getColor(index) {
        let newIndex = index % colors.length;
        return colors[newIndex];
    }
}

export default Color;