import React from "react";

const agents = [
  {
    name: "Devon Lane",
    location: "Naperville",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Jane Cooper",
    location: "Fairfield",
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "Savannah Nguyen",
    location: "Pembroke Pines",
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    name: "Darrell Steward",
    location: "Orange",
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    name: "Devon Lane",
    location: "Naperville",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Jane Cooper",
    location: "Fairfield",
    image: "https://i.pravatar.cc/300?img=6",
  },
  {
    name: "Savannah Nguyen",
    location: "Pembroke Pines",
    image: "https://i.pravatar.cc/300?img=7",
  },
  {
    name: "Darrell Steward",
    location: "Orange",
    image: "https://i.pravatar.cc/300?img=8",
  },
];

const TopAgents = () => {
  return (
    <div className="bg-black py-16 px-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-teal-400 mb-10">
        Our Top Agents
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
          >
            <figure className="p-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="rounded-xl w-full h-56 object-cover"
              />
            </figure>

            <div className="card-body items-start pt-0">
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="text-gray-500 text-sm">{agent.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAgents;
