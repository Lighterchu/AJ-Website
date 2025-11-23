const DJPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
  
    return (
      <div>
        <h1>{slug}</h1>
      </div>
    );
  };
  
  export default DJPage;
  