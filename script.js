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

    // Save as PNG button 
    document.getElementById('save-png').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

    // Save as JPG button
    document.getElementById('save-jpg').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.jpg';
        link.click();
    });

    // Save as PDF button

    document.getElementById('save-pdf').addEventListener('click', () => {
    // Get canvas data URL in PNG format
        const canvas = document.getElementById('signature-pad');
        const imgData = canvas.toDataURL('image/png');

    // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm', 
            format: 'a4'
    });

    // Add the image data to the PDF
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the generated PDF
        pdf.save('signature.pdf');
});

});
