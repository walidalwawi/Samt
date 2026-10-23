import http.server,os,sys
root='/home/claude/samt/site'
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=root,**k)
    def log_message(s,*a): pass
    def send_head(s):
        p=s.path.split('?')[0]
        fp=os.path.join(root,p.lstrip('/'))
        if p!='/' and not os.path.exists(fp) and os.path.exists(fp+'.html'): s.path=p+'.html'
        elif p!='/' and not os.path.exists(fp) and not p.startswith('/admin'): s.path='/404.html'
        if p=='/admin': s.path='/admin.html'
        return super().send_head()
http.server.ThreadingHTTPServer(('127.0.0.1',8765),H).serve_forever()
