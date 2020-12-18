import React from 'react';

const styles = {
	canvas: {
		border: '1px solid black',
		borderRadius: '8px',
		marginBottom: -30,
		marginTop: -10
	}
};

const MyCanvas = props => {
	const [isDrawing, setIsDrawing] = React.useState(false);

	const canvasRef = React.useRef(null);
	const contextRef = React.useRef(null);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		contextRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = ({ nativeEvent }) => {
		if (isDrawing) {
			const { offsetX, offsetY } = nativeEvent;
			contextRef.current.lineTo(offsetX, offsetY);

			//settings
			contextRef.current.lineWidth = props.brushThickness;
			contextRef.current.strokeStyle = props.colour;
			contextRef.current.lineCap = props.lineCap;

			contextRef.current.stroke();
		}
	};

	React.useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 800;
		canvas.height = 400;
		canvas.style.width = '800px';
		canvas.style.height = '400px';

		const context = canvas.getContext('2d');
		context.scale(1, 1);
		contextRef.current = context;
	}, [props.rerender]); //on props.rerender change -> clean the canvas

	return (
		<div id='myCanvas'>
			<canvas
				style={styles.canvas}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				ref={canvasRef}
			/>
		</div>
	);
};

export default MyCanvas;
