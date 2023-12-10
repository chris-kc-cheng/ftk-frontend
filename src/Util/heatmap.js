export const heatmapClass = (value, min = -1, max = 1) => {
    const percentile = Math.min(99, Math.max(0, Math.floor((value - min) / (max - min) * 100)));
    return `heatmap-${percentile}`;
}

export const makeHeatmap = (minRGB = [248, 105, 107], maxRGB = [99, 190, 123]) => {
    const styles = [];
    for (let i = 0; i < 101; i++) {
        const value = -1 + i * 0.02;        
        // Distance from zero
        const distance = Math.abs(value);
        const rgb = value > 0 ? maxRGB : minRGB;        
        styles.push(rgb.map(color => 255 - Math.floor((255 - color) * distance)));
    }    
    return Object.assign({}, ...styles.map((x, i) => ({ [`& .heatmap-${i}`]: ({ backgroundColor: `rgb(${x[0]},${x[1]},${x[2]}); color: black;` }) })));
}