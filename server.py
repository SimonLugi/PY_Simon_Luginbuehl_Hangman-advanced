import http.server
import socketserver
import threading

PORT = 80
DIRECTORY = "public"

def handler_from(directory):
    def _init(self, *args, **kwargs):
        return http.server.SimpleHTTPRequestHandler.__init__(self, *args, directory=self.directory, **kwargs)

    def log_message(self, format, *args):
        pass  

    return type(
        f'HandlerFrom<{directory}>',
        (http.server.SimpleHTTPRequestHandler,),
        {'__init__': _init, 'directory': directory, 'log_message': log_message}
    )

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass 

def run_server():
    with ThreadedTCPServer(("", PORT), handler_from(DIRECTORY)) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
