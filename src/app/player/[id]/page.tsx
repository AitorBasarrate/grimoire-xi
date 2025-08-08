interface PlayerDetailPageProps {
  params: {
    id: string;
  };
}

export default function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Player Details</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">Player {params.id} details will be displayed here</p>
        </div>
      </main>
    </div>
  );
}