export function randomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
