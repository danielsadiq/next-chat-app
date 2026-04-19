"use client"

function ListMessages() {
  return (
    <div className="space-y-7">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
        return (
          <div className="flex gap-2" key={value}>
            <div className="h-10 w-10 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h1 className="font-bold">Daniel</h1>
                <h1 className="text-sm text-gray-400">
                  {new Date().toDateString()}
                </h1>
              </div>
              <p className="text-gray-600">
                In a chat-app, your id is the primary key linking the chat
                messages to the user. Since your table shows a foreign key
                relationship to
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListMessages;
