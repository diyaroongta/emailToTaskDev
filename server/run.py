#!/usr/bin/env python3
import sys
import os
from pathlib import Path
from dotenv import load_dotenv

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

load_dotenv(dotenv_path=project_root / '.env', override=False)

# Import and run the Flask app
from server.app import app

if __name__ == "__main__":
    import os
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    port = int(os.getenv("PORT", 5000))
    app.run("127.0.0.1", port, debug=True)

