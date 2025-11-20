# Deploy to WordPress via GitHub (No Coding Required)

Since you have a GitHub account but don't want to run build commands manually, we will use **GitHub Actions** to build the plugin for you.

## Step 1: Push Code to GitHub

1.  Go to **GitHub.com** and create a new **Public Repository** (e.g., named `wp-speed-master-portfolio`).
2.  Upload all the files from this project to that repository. 
    *   Ensure the `.github/workflows/build.yml` file is included in the upload (it might be in a hidden folder locally, so make sure it uploads).
    *   Ensure `wpspeedmaster-widgets.php` and `elementor-widget.php` are in the root.

## Step 2: Wait for the Build

1.  Once you upload the files, click the **"Actions"** tab at the top of your GitHub repository.
2.  You should see a workflow named **"Build WordPress Plugin"** running (it will have a yellow or green circle).
3.  Wait about 1-2 minutes for it to finish (Green Checkmark).

## Step 3: Download Your Plugin

1.  Click on the successful workflow run (usually titled "Update files" or whatever your commit message was).
2.  Scroll down to the **"Artifacts"** section at the bottom of the page.
3.  Click on **`wpspeedmaster-plugin`**.
4.  This will download a **ZIP file** to your computer.

## Step 4: Install on WordPress

1.  Login to your WordPress Admin (`wordpressspeedoptimizationexpert.com/wp-admin`).
2.  Go to **Plugins > Add New**.
3.  Click **Upload Plugin**.
4.  Upload the zip file you just downloaded from GitHub.
5.  Click **Install Now** -> **Activate**.

## Step 5: Add Gemini API Key (Optional but Recommended)

To make the "AI Advisor" work, you need your API Key.
1.  In your WordPress hosting file manager, find the `wp-config.php` file.
2.  Add this line near the top:
    ```php
    define('GEMINI_API_KEY', 'your_actual_api_key_here');
    ```

## Step 6: Use in Elementor

1.  Go to any page and **"Edit with Elementor"**.
2.  Search for the widget **"React Speed Component"**.
3.  Drag it onto the page.
4.  **Select the Component**:
    *   In the left sidebar, look for **"Choose Component"**.
    *   Select **"Hero Section"**, **"Services"**, **"Portfolio"**, etc.
5.  **Edit Text** (Hero Section):
    *   You can change the Title and Subtitle directly in the Elementor sidebar fields.

**Note:** The React components might not fully render inside the Elementor *Editor* (you might see a placeholder box). Click **"Preview"** or **"Publish"** to see them working live on your site.
