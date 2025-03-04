 const AdminHeroSection = () => {
  return (
  <>
 <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white text-center px-6 " 
      style={{
        backgroundImage: `url('https://rapido-app-assets.storage.googleapis.com/66e1052cdca1e68cc52d070e8c9631aa_1736774712641.png')`,
      }}
    >
      <div className="relative h-[60vh] bg-cover bg-center text-center flex flex-col items-center justify-center p-6">
         <h1 className="text-6xl text-black font-extrabold ">Welcome, Admin</h1>
        <p className="text-2xl mt-4 text-black font-light drop-shadow-md">
          Empowering you to manage users, rides, and analytics effortlessly.
        </p>
      </div>
    </section>
  </>
  );
};
export default AdminHeroSection;

