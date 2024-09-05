window.addEventListener('load', () => {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#333';

    const getPosition = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left,
            y: e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        isDrawing = true;
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const pos = getPosition(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        isDrawing = false;
        ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        startDrawing(e);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing(e);
    });

    // Clear button 
    document.getElementById('clear-btn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save button 
    document.getElementById('save-btn').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });
});
