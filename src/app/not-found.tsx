import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-mono text-green-500 selection:bg-green-500/30 selection:text-green-200">
      {/* Contenedor de la Terminal */}
      <div className="w-full max-w-2xl rounded-lg border border-green-500/30 bg-black p-6 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
        {/* Cabecera Terminal */}
        <div className="mb-4 flex items-center gap-2 border-b border-green-500/20 pb-2">
          <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
          <span className="ml-2 text-xs text-green-500/50">bash — 80x24</span>
        </div>

        {/* Contenido */}
        <div className="space-y-2 text-sm md:text-base">
          <p>
            <span className="text-purple-400">root@envigite</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span> ./access_page.sh
          </p>

          <p className="animate-pulse font-bold text-red-500">
            ERROR 404: PAGE NOT FOUND
          </p>

          <p className="text-gray-400">
            &gt; The requested resource could not be found on this server.
          </p>
          <p className="text-gray-400">
            &gt; Check the URL or return to the safe zone.
          </p>

          <br />

          <p>
            <span className="text-purple-400">root@envigite</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span> help --fix
          </p>

          <div className="mt-4 border-l-2 border-green-500/30 pl-4">
            <p className="mb-2 text-gray-300">Available commands:</p>
            <Link
              href="/"
              className="inline-block bg-green-500/10 px-4 py-2 text-green-400 transition-colors duration-300 hover:bg-green-500 hover:text-black"
            >
              cd /home
            </Link>
          </div>

          {/* Cursor parpadeante */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-purple-400">root@envigite</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$</span>
            <span className="block h-5 w-2.5 animate-pulse bg-green-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
