export default function Input({ ...props }) {
  return (
    <input
      style={{
        display: 'block',
        marginBottom: 10,
        padding: 8,
        width: 250,
      }}
      {...props}
    />
  );
}