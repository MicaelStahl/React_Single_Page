using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Repositories;

namespace React_Single_Page
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration config)
        {
            Configuration = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<CarDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<ICarRepository, CarRepository>();

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {   // Set a short timeout for easy testing.
                // 20 Min is standard time.
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    { // A * simply indicates it's open for all. This is ONLY the solution for developer code.
                        builder.WithOrigins("*")
                       .AllowAnyHeader()
                       .AllowAnyMethod();
                    });
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSession();

            app.UseCors();

            app.UseMvcWithDefaultRoute();
            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute("api", "api",
            //        defaults: new { controller = "api", action = "CarAPI" });
            //    routes.MapRoute("Home", "{controller=Home}/{action=Index}/{id?}");
            //});
        }
    }
}
