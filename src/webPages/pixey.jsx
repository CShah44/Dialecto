import Layout from "./layout.jsx";

function Pixey() {
  return (
    <Layout>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-neutral-200/80 p-6 rounded-lg shadow-md w-[50%] font-bold text-indigo-900">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lg">How can I assist you?</span>
            <select className="w-[40%] p-2 border rounded-md bg-neutral-200/80 hover:bg-neutral-100/100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="h-[30vh] border rounded-md p-6 bg-neutral-200/70 hover:bg-neutral-100/100">
              Box 1
            </div>
            <div className="h-[30vh] border rounded-md p-6 bg-neutral-200/70 hover:bg-neutral-100/100">
              Box 2
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pixey;
